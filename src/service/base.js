/*
const filterDic = (data, transForm, dataBase) => {
  transForm ? transForm = transForm : transForm = 'transForm';
  dataBase ? dataBase = dataBase : dataBase = 'dataBase';
  _.mapObject(data, (val, k) => {
    if (val[transForm] && !data._remark) {
      switch (val[transForm]) {
        case 'time':
          val[dataBase] = val.value;
          val.value = DateFormat(val.value, val.time)
          break;
        default:
          val[dataBase] = val.value;
      }
    }
  });
  return data;
};

export {
  filterDic
}*/
