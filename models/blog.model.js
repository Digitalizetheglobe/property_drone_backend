export default (sequelize, DataTypes) => {
    const Blog = sequelize.define("Blog", {
        blogTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blogDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        blogContent: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        blogImage: {
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

    return Blog;
};