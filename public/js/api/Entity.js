  /**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  static URL = '';
  static HOST = 'http://localhost:8000';
  

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    const xhr = createRequest({
      url: this.URL,
      data: data,
      method: 'GET',
      callback: callback
    });    
    
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    const modifiedData = Object.assign({ _method: 'PUT' }, data );
    console.log(data);
    console.log(modifiedData);
    const xhr = createRequest({
      url: this.URL,
      data: modifiedData,
      method: 'POST',
      callback: callback
    });  
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let modifiedData = Object.assign({ id: id }, data );
    const xhr = createRequest({
      url: this.URL + `/${id}/`,
      data: modifiedData, // +id
      method: 'GET',
      callback: callback
    });  
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let modifiedData = Object.assign({ _method: 'DELETE' }, data );
    modifiedData = Object.assign({ id: id }, modifiedData );
    const xhr = createRequest({
      url: this.URL,
      data: modifiedData,
      method: 'POST',
      callback: callback
    });  
  }
}




