import winattr from 'winattr';

console.log(winattr.getSync(`.`));

// winattr.setSync(`.`, {
//   archive: false,
//   hidden: false,
//   system: true,
//   readonly: true,
// });
