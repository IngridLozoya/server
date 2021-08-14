import { extname } from 'path/posix';

export const customName = (req, file, callback) => {
  const name = file.originalName.split('.')[0];
  const fileExtName = extname(file.originalName);

  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
