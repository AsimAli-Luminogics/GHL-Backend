import axios from 'axios';

class OctoparseUtil {
  async octoparsePostRequest(url: string, data: any) {
    const response = await axios.post(
      `${process.env.octoparseUri}/${url}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    return response.data;
  }

  async octoparseGetRequest(url: string) {
    const response = await axios.get(`${process.env.octoparseUri}${url}`, {
      headers: {
        Authorization: `Bearer ${process.env.telnyxApiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  }
}

export const octoparseUtil = new OctoparseUtil();
