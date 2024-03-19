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
              id: stream.user_id,
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
    res.render('streamers/index', locals);
  } catch (error) {
    console.error(error);
  }
};

exports.showStreamer = async (req, res) => {
  try {
    const getData = await getStreamers();
    let user = null;

    getData.forEach((data) => {
      if (!user) {
        user = data.users.find((user) => user.id === req.params.id);
      }
    });

    const locals = {
      title: 'CocoApp',
      data: user ? [user] : []
    };

    res.render('streamers/show', locals);
  } catch (error) {
    console.log(error);
  }
};
