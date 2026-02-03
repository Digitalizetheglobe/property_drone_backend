export default (sequelize, DataTypes) => {
    const News = sequelize.define("News", {
        newsTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        newsDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        newsContent: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        newsImage: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        writer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        bookmarks: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    });

    return News;
};
