export default (req: any, res: any) => {
  if (req.method === 'GET') {
    res.status(200).json({
      nickname: 'hakim',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
