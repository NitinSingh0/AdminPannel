const User = require("../models/User");
const Poll = require("../models/Poll");

//create New Poll
exports.createPoll = async (req, res) => {
  const { question, type, options, creatorId } = req.body;
  if (!question || !type || !creatorId) {
    return res
      .status(400)
      .json({ message: "Question, type and creator id are required." });
  }
  try {
    let processedOptions = [];
    switch (type) {
      case "single-choice":
        if (!options || options.length < 2) {
          return res.status(400).json({
            message: "Single-choice poll must have at least two options.",
          });
        }
        processedOptions = options.map((option) => ({ optionText: option }));
        break;
      case "open-ended":
        processedOptions = []; //No option needed for open-ended.
        break;
      case "rating":
        processedOptions = [1, 2, 3, 4, 5].map((value) => ({
          optionText: value.toString(),
        }));
        break;
      case "yes/no":
        processedOptions = ["Yes", "No"].map((option) => ({
          optionText: option,
        }));
        break;
      case "image-based":
        if (!options || options.length < 2) {
          return res
            .status(400)
            .json({ message: "Image based poll must have at least two image" });
        }
        processedOptions = options.map((url) => ({ optionText: url }));
        break;
      default:
        return res.status(400).json({ message: "Invalid poll type." });
    }
    const newPoll = await Poll.create({
      question,
      type,
      options: processedOptions,
      creator: creatorId,
    });
    res.status(201).json(newPoll);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating poll", error: err.message });
  }
};

//Get All Polls
exports.getAllPolls = async (req, res) => {
  const { type, creatorId, page = 1, limit = 10 } = req.query;
  const filter = {};
  const userId = req.user._id;

  if (type) filter.type = type;
  if (creatorId) filter.creator = creatorId;

  try {
    //Calculate pagination parameters
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumer - 1) * pageSize;

    //Fetch polls with pagination
    const polls = await Poll.find(filter)
      .populate("creator", "name username email profileImageUrl")
      .populate({
        path: "response.voterId",
        select: "username profileImageUrl name",
      })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    //Add 'userHasVoted' flag for each poll
    const updatedPolls = polls.map((poll) => {
      const userHasVoted = poll.voters.some((voterId) =>
        voterId.equals(userId)
      );
      return {
        ...poll.toObject(),
        userHasVoted,
      };
    });

    //Get total count of polls for paginatin metadata
    const totalPolls = await Poll.countDocuments(filter);
    const stats = await Poll.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    //ensure all types are included in stats even those with zero counts
    const allTypes = [
      { type: "single-choice", label: "Single Choice" },
      { type: "yes/no", label: "Yes/No" },
      { type: "rating", label: "Rating" },
      { type: "image-based", label: "Image Based" },
      { type: "open-ended", label: "Open Ended" },
    ];
    const statsWithDefaults = allTypes
      .map((pollType) => {
        const stat = stats.find((item) => item.type === pollType.type);
        return {
          label: pollType.label,
          type: pollType.type,
          count: stat ? stat.count : 0,
        };
      })
      .sort((a, b) => b.count - a.count);
    res.status(200).json({
      polls: updatedPolls,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalPolls / pageSize),
      totalPolls,
      stats: statsWithDefaults,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//Get All Polls
exports.getVotedPolls = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user._id;

  try {
    //calculate pagination parameters
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    //fetch polls where the user has voted
    const polls = await Poll.find({ voters: userId }) //filter by polls where the user Id exists in the voters
      .populate("creator", "name profileImageUrl username email")
      .populate({
        path: "responses.voterId",
        select: "username profileImageUrl name",
      })
      .skip(skip)
      .limit(pageSize);
    //Add 'userhasVoted' flag for each poll
    const updatedPolls = polls.map((poll) => {
      const userHasVoted = poll.voters.some((voterId) =>
        voterId.equals(userId)
      );
      return {
        ...poll.toObject(),
        userHasVoted,
      };
    });
    //Get total count of voted polls for pagination metadata
    const totalVotedPolls = await Poll.countDocuments({ voters: userId });
    res.status(200).json({
      polls: updatedPolls,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalVotedPolls / pageSize),
      totalVotedPolls,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//get Poll by Id
exports.getPollById = async (req, res) => {
  const { id } = req.params;

  try {
    const poll = await Poll.findById(id).populate("creator", "username email");
    if (!poll) {
      return res
        .status(404)
        .json({ message: "Error registering user", error: err.message });
    }
    res.status(200).json(poll);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//vote poll
exports.voteOnPoll = async (req, res) => {
  const { id } = req.params;
  const { optionIndex, voterId, responseText } = req.body;

  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    if (poll.closed) {
      return re.status(400).json({ message: "Poll is closed" });
    }
    if (poll.voters.includes(voterId)) {
      return res
        .status(400)
        .json({ message: "User has already voted on this poll." });
    }
    if (poll.type === "open-ended") {
      if (!responseText) {
        return res
          .status(400)
          .json({ message: "Response text is required for open-ended polls." });
      }
      poll.responses.push({ voterId, responseText });
    } else {
      if (
        optionIndex === undefined ||
        optionIndex < 0 ||
        optionIndex >= poll.options.length
      ) {
        return res.status(400).json({ message: "Invalid option index." });
      }
      poll.options[optionIndex].votes += 1;
    }
    poll.voters.push(voterId);
    await poll.save();
    res.status(200).json(poll);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//close poll
exports.closePoll = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    if (poll.creator.toString() != userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to close this poll." });
    }
    poll.closed = true;
    await poll.save();
    res.status(200).json({ message: "Poll closed successfully", poll });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//bookmark poll
exports.bookmarkPoll = async (req, res) => {
  const { id } = req.params; //poll ID
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //Check if poll is already booked
    const isBookmarked = user.bookmarkedPolls.includes(id);
    if (isBookmarked) {
      //remove poll from bookmarks
      user.bookmarkedPolls = user.bookmarkedPolls.filter(
        (pollId) => pollId.toString() !== id
      );
      await user.save();
      return res
        .status(200)
        .json({
          message: "Poll removed from bookmarks",
          bookmarkedPolls: user.bookmarkedPolls,
        });
    }
    //Add poll to bookmarks
    user.bookmarkedPolls.push(id);
    await user.save();
    res
      .status(200)
      .json({
        message: "Poll bookmarked successfully",
        bookmarkedPolls: user.bookmarkedPolls,
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//Get all bookmarked polls
exports.getBookmarkedPolls = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate({
      path: "bookmarkedPolls",
      populate: {
        path: "creator",
        select: "name username profileImageUrl",
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const bookmarkedPolls = user.bookmarkedPolls;
    // Add 'userHasVoted' flag for each poll
    const updatedPolls = bookmarkedPolls.map((poll) => {
      const userHasVoted = poll.voters.some((voterId) =>
        voterId.equals(userId)
      );

      return {
        ...poll.toObject(),
        userHasVoted,
      };
    });
    res.status(200).json({ bookmarkedPolls: updatedPolls });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//Delete Poll
exports.deletePoll = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const poll = await Poll.findById(id);
    if(!poll){
      return res.status(404).json({ message: "Poll not found" });
    }
    if (poll.creator.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this poll." });
    }
    await Poll.findByIdAndDelete(id);
    res.status(200).json({ message: "Poll deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};
