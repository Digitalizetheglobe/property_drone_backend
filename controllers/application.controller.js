import { JobApplication, Career } from "../models/index.js";

// Get all job applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.findAll();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get applications by job ID
export const getApplicationsByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await JobApplication.findAll({
      where: { jobId }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findByPk(req.params.id);
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit a new job application
export const submitApplication = async (req, res) => {
  try {
    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      currentCompany,
      linkedInProfile,
      portfolioUrl,
      experienceYears,
      currentSalary,
      expectedSalary,
      noticePeriod,
      coverLetter,
      status,
    } = req.body; // Extract form data from the request body

    // Validate required fields
    if (!jobId || !firstName || !lastName || !email) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    
    // Check if resume exists in the uploaded files
    if (!req.files || !req.files['resume']) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // Process the file information
    const resumeFile = req.files['resume'][0];
    const resumeData = {
      filename: resumeFile.filename,
      originalName: resumeFile.originalname,
      path: resumeFile.path,
      size: resumeFile.size,
      mimetype: resumeFile.mimetype
    };

    // Process additional documents if they exist
    let additionalDocsData = null;
    if (req.files['additionalDocuments']) {
      additionalDocsData = req.files['additionalDocuments'].map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      }));
    }

    // Create a new job application in the database
    const newApplication = await JobApplication.create({
      jobId,
      firstName,
      lastName,
      email,
      phone: phone || '',
      currentCompany: currentCompany || null,
      linkedInProfile: linkedInProfile || null,
      portfolioUrl: portfolioUrl || null,
      experienceYears: experienceYears || 0,
      currentSalary: currentSalary || null,
      expectedSalary: expectedSalary || null,
      noticePeriod: noticePeriod || null,
      coverLetter: coverLetter || null,
      resume: resumeData, // This will be automatically stringified by Sequelize
      additionalDocuments: additionalDocsData, // This will be automatically stringified by Sequelize
      status: status || 'submitted',
      submissionDate: new Date(),
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const application = await JobApplication.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    
    application.status = status;
    await application.save();
    
    res.json({ 
      message: "Application status updated successfully",
      application
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an application
export const deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findByPk(req.params.id);
    if (!application) return res.status(404).json({ message: "Application not found" });
    await application.destroy();
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};