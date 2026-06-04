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
        },
        metaTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        metaDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        metaKeyword: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        canonical: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return News;
};
