const Story = require("../models/Story");

class StoryServices {
  //fetch all stories
  async fetchAll(data) {
    return Story.find({});
  }

  //fetch single story
  async getStoryById(data) {
    return Story.findOne(data).exec();
  }

  //add new story
  async addStory(data) {
    return Story.create(data);
  }

  //update story
  async updateById(id, field) {
    return Story.findByIdAndUpdate(id, field, {
      new: true,
      runValidators: true,
    })
      .lean()
      .exec();
  }
}

const storyServices = new StoryServices();
module.exports = storyServices;
