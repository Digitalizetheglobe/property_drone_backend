export default (sequelize, DataTypes) => {
    const JobApplication = sequelize.define("JobApplication", {
        jobId: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'Careers',
                key: 'jobId'
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentCompany: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        linkedInProfile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        portfolioUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        experienceYears: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currentSalary: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expectedSalary: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        noticePeriod: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        coverLetter: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        resume: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        additionalDocuments: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('submitted', 'under_review', 'shortlisted', 'rejected', 'offered', 'hired'),
            defaultValue: 'submitted',
            allowNull: false
        },
        submissionDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });

    return JobApplication;
};