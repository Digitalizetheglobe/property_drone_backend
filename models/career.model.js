export default (sequelize, DataTypes) => {
    const Career = sequelize.define("Career", {
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jobId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jobType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experienceLevel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salaryRange: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        postedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        applicationDeadline: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        jobDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        requirements: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        benefits: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        additionalDocFiles: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    });

    return Career;
};