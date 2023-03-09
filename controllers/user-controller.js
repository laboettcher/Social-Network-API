// Require models
const { User, Thought } = require('../models')

// Create user controller
const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                // -__v to select all
                select: ('-__v')
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    // Get a single user by their id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .select('-__v')
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user associated with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // Create a new user
    createUser({ body }, res) {
        console.log('BODY OBJECT', body)
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    // Update a user (by id)
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user associated with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
    // Delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user associated with this id.' });
                    return;
                }
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.id } }
                )
                .then(() => {
                    Thought.deleteMany({ username: dbUserData.username })
                        .then(() => {
                            res.json({ message: 'User successfully deleted.' });
                        })
                        .catch((err) => res.status(400).json(err));
                })
                .catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(400).json(err));
    },
    // User can add a friend
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
        .select('-__v')
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user associated with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    // User can remove a friend
    removeFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .select('-__v')
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No friend associated with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
}

// Export!!
module.exports = userController