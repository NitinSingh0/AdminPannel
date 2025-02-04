const User = require("../models/User");
const Poll = require("../models/Poll");

exports.createPoll = async (req, res) => {
    const { question, type, options, creatorId } = req.body;
    if (!question || !type || !creatorId) {
        return res.status(400).json({ message: "Question, type and creator id are required." });

    }
    try { 
        let processedOptions = [];
        switch (type) {
            case "single-choice":
                if (!options || options.length < 2) {
                    return res.status(400).json({ message: "Single-choice poll must have at least two options." });
                }
                processedOptions = options.map((option) => ({ optionText: option }));
                break;
            case "open-ended":
                processedOptions = [];//No option needed for open-ended.
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
                    return res.status(400).json({ message: "Image based poll must have at least two image" });

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
    } catch (err) {
        res
          .status(500)
          .json({ message: "Error registering user", error: err.message });
    }
}