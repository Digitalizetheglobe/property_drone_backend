export default (sequelize, DataTypes) => {
    const CommercialProperty = sequelize.define("CommercialProperty", {
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        listingId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        images: {
            type: DataTypes.JSON,
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
        buildingName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        unitNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        floor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        builtUpArea: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        carpetArea: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        reservedCarParking: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        reserved2WheelerParking: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        amenities: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        furnishedDetails: {
            type: DataTypes.JSON,
            allowNull: true
        },
        pricePerSqFt: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        propertyType: {
            type: DataTypes.STRING, // e.g. Office, Shop
            allowNull: true
        },
        propertyStatus: {
            type: DataTypes.STRING, // e.g. Available, Sold
            allowNull: true
        },
        possession: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contact: {
            type: DataTypes.JSON,
            allowNull: true
        },
        demo1: { type: DataTypes.STRING, allowNull: true },
        demo2: { type: DataTypes.STRING, allowNull: true },
        demo3: { type: DataTypes.STRING, allowNull: true },
        demo4: { type: DataTypes.STRING, allowNull: true }
    });

    return CommercialProperty;
};
