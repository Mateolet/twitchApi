const { getStreamers } = require('../utils/streamersFunctions');

exports.home = async (req, res) => {
  try {
    const streamersData = await getStreamers();
    const processedData = [];

    streamersData.forEach((streamerData) => {
      streamerData.streams.forEach((stream) => {
        if (stream.viewer_count > 0) {
          const user = streamerData.users.find(
            (user) => user.id === stream.user_id
          );
          if (user) {
            processedData.push({
              game: stream.game_name,
              user: stream.user_name,
              viewers: stream.viewer_count,
              image: user.profile_image_url,
            });
          }
        }
      });
    });

    const locals = {
      title: 'CocoApp',
      data: processedData,
    };
    res.render('index', locals);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error obteniendo datos de Twitch');
  }
};
