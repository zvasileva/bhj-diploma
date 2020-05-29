/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    const xhr = Account.create(options.data, ( err, resp ) => {
      console.log( resp );
      this.element.reset();
      App.update();
      const targetModal = App.getModal( 'createAccount' );
      targetModal.close(); 
    });
  }
}
