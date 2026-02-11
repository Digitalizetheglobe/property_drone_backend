export default (sequelize, DataTypes) => {
    const Plot = sequelize.define("Plot", {
        listingId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        project: {
            type: DataTypes.STRING,
            allowNull: true
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        propertyType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        propertyStatus: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.JSON,
            allowNull: true
        },
        plotDetails: {
            type: DataTypes.JSON,
            allowNull: true
        },
        priceDetails: {
            type: DataTypes.JSON,
            allowNull: true
        },
        possession: {
            type: DataTypes.STRING,
            allowNull: true
        },
        amenities: {
            type: DataTypes.JSON,
            allowNull: true
        },
        images: {
            type: DataTypes.JSON,
            allowNull: true
        },
        demo1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        demo2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        demo3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        demo4: {
            type: DataTypes.STRING,
            allowNull: true
        },
        videoUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        googleMapUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        reraNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postedBy: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contact: {
            type: DataTypes.JSON,
            allowNull: true
        }
    });

    return Plot;
};

