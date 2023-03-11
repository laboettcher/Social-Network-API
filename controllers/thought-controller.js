// Require models and types
const { Thought, User, Types } = require('../models');

// Create thought controller
const ThoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Get a single thought by its id
    getThoughtById({ params }, res) {
        console.log('params sent', params)
        Thought.findOne({ _id: params.thoughtId })
            .select('-__v')
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought associated with this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // User is able to add a thought
    addThought({ params, body }, res) {
        console.log('INCOMING BODY', body)
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user associated with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // Remove a thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedthought => {
                if (!deletedthought) {
                    return res.status(404).json({ message: 'No thought associated with this id.' });
                }
                return User.findOneAndUpdate(
                    { _id: params.username },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // Add a reaction to a thought
    addReaction({ params, body }, res) {
        console.log('INCOMING BODY', body)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: ture }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user associated with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // Remove a reaction from a thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

// Export!!
module.exports = ThoughtController