const fs = require('fs');
const rimraf = require("rimraf");
const wrench = require("wrench");
const DIRECTORYPATH = './';
const OUTPUTDIRECTOREPATH = '../';
const PUBLICPATH = './public/';

function copy(source, target, cb = () => { }) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function (err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function (err) {
    done(err);
  });
  wr.on("close", function (ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

const INPUTPATH = DIRECTORYPATH + 'build/';
const OUTPUTPATH = OUTPUTDIRECTOREPATH + PUBLICPATH;

function clearFunc(callback = function () { }) {
  fs.readdir(OUTPUTPATH, (err, files) => {
    files.forEach(file => {
      const DELETED = OUTPUTPATH + file;
      const statsBEFORE = fs.lstatSync(DELETED);
      if (statsBEFORE.isDirectory()) {
        rimraf.sync(DELETED)
      }
      else {
        fs.unlinkSync(DELETED)
      }
    })

    callback()
  })
}

function copyFunc() {
  fs.readdir(INPUTPATH, (err, files) => {
    files.forEach(file => {
      const BEFORE = INPUTPATH + file,
        AFTER = OUTPUTPATH + file;

      if (!fs.existsSync(OUTPUTPATH)) fs.mkdirSync(OUTPUTPATH);

      if (fs.existsSync(BEFORE)) {
        const statsBEFORE = fs.lstatSync(BEFORE);
        if (statsBEFORE.isDirectory()) {
          wrench.copyDirSyncRecursive(BEFORE, AFTER);
        }
        else {
          copy(BEFORE, AFTER);
        }
      }
    });
  })
}

if (fs.existsSync(OUTPUTPATH)) {
  clearFunc(copyFunc)
}
else {
  copyFunc()
}
