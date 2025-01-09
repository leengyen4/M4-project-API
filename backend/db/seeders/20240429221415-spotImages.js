'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 2,
        url: 'https://escapebrooklyn.com/wp-content/uploads/2022/04/6.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://escapebrooklyn.com/wp-content/uploads/2022/04/9.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://escapebrooklyn.com/wp-content/uploads/2022/04/10.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://escapebrooklyn.com/wp-content/uploads/2022/04/11.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://escapebrooklyn.com/wp-content/uploads/2022/04/13.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://escapebrooklyn.com/wp-content/uploads/2022/04/1.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://escapebrooklyn.com/wp-content/uploads/2022/04/14.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://escapebrooklyn.com/wp-content/uploads/2022/04/16.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-804397736760302276/original/95046045-6073-49bf-9777-d2208d174501.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-804397736760302276/original/9d234043-2b9d-44f5-bf59-e1f31275be00.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-926925187614366207/original/ac6aa1e8-541b-4cdf-8d1e-d9ffd961e251.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-926925187614366207/original/7d4e179e-b810-4e26-96d2-bb83ecb5ea51.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-926925187614366207/original/94d9de5d-1981-4c85-9223-f9a3dc6becd6.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-926925187614366207/original/9229e509-2b7a-4eb3-aa64-149fbd656769.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-926925187614366207/original/70fa11a4-d801-439d-93e0-f20a597cdb9b.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1166844138712338694/original/1a5fdf4c-f299-4df0-94bb-93e152cddc35.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1166844138712338694/original/26d3037a-2ef0-4fc6-ae97-e836c943ff31.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1166844138712338694/original/3bb86e99-7410-4eef-a9e0-3f2eded48058.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1166844138712338694/original/1a232f8f-0131-460a-9ace-240f06558ed9.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1166844138712338694/original/c2ded26f-3e0e-4398-a318-965cac869e72.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/73d356aa-cbc5-4499-b1d3-70bf7e727eea.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/e2c55b93-7935-4797-b466-58be1a221f64.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/0bd85b92-b17b-4e9b-afb9-97d1b20f3159.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/8bf56348-c3d1-4097-b937-1cd091d8905a.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/4f1bb74f-5203-4798-bbb0-7829d2e5cd81.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-965995831438864025/original/0c282567-3fe0-4e11-bd8a-d925c58dbe3a.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-965995831438864025/original/cc199bce-440c-490f-ab33-0ebfb5e81ef2.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-965995831438864025/original/6fee8b5e-7590-4660-953c-c847c359c1ed.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-965995831438864025/original/3949daa0-2edc-4559-811f-89ff0b79ae0c.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-965995831438864025/original/6130e6df-026f-4e68-b6d9-8d093801eeeb.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-965995831438864025/original/b835940d-548c-44ca-a358-727253d13531.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE5MDMyODI%3D/original/79dfa401-5496-46c4-9df1-d77f02defe7d.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE5MDMyODI%3D/original/c3abdb26-9265-4ac3-8a12-80443e1ccb44.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/15661a7c-bfb2-421d-ac06-332e5d28f623.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/512bb8e4-3677-428d-b861-8407a68e335f.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/56602c92-62eb-4b7f-97a9-6b5f424ce7e0.jpg',
        preview: false
      },



    ], { validate: true }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
