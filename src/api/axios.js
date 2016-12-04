import axios from 'axios';

const PAGE_SIZE = '10000';

export default axios.create({
  params: {
    size: PAGE_SIZE
  }
});
