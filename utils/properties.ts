import {resize} from 'imagemagick';

export async function compressImageFixed(filePath: string, filePathSmall: string) {
  return new Promise( (resolve, reject) => {
    resize({
      srcPath: filePath,
      dstPath: filePathSmall,
      width:   237,
      height:   118
    }, function(err, stdout){
      if(err) {
        reject(err)
      }
      resolve(stdout);
    });
  });
}
