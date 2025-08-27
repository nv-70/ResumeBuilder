import Resume from "../models/resumeModel.js";
import fs from "fs";
import path from "path";

// CREATE RESUME
export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // Default template
    const defaultResumeData = {
      profileInfo: {
        profilePreviewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        { company: "", role: "", startDate: "", endDate: "", description: "" },
      ],
      education: [{ degree: "", institution: "", startDate: "", endDate: "" }],
      skills: [{ name: "", progress: 0 }],
      projects: [{ title: "", description: "", github: "", liveDemo: "" }],
      certifications: [{ title: "", issuer: "", year: "" }],
      languages: [{ name: "", progress: 0 }],
      interests: [""],
    };

    const newResume = await Resume.create({
      userId: req.user.id,
      title,
      ...defaultResumeData,
      ...req.body, // allow overriding fields from client
    });

    res.status(201).json(newResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating resume", error: error.message });
  }
};

// GET ALL USER RESUMES
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.status(200).json(resumes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching resumes", error: error.message });
  }
};

// GET RESUME BY ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.status(200).json(resume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching resume", error: error.message });
  }
};

// UPDATE RESUME
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume)
      return res
        .status(404)
        .json({ message: "Resume not found or not authorized" });

    Object.assign(resume, req.body);
    const savedResume = await resume.save();

    res.status(200).json(savedResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update resume", error: error.message });
  }
};

// DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume)
      return res
        .status(404)
        .json({ message: "Resume not found or not authorized" });

    const uploadsFolder = path.join(process.cwd(), "uploads");

    // delete thumbnail
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadsFolder, resume.thumbnailLink);
      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }

    // delete profile preview
    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(
        uploadsFolder,
        resume.profileInfo.profilePreviewUrl
      );
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }

    await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete resume", error: error.message });
  }
};
