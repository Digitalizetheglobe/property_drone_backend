export default (sequelize, DataTypes) => {
  const YoutubeVideo = sequelize.define("YoutubeVideo", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    youtube_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return YoutubeVideo;
};