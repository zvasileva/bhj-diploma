/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    const xhr = User.register(options.data, ( err, resp ) => {
      User.setCurrent( resp.user );
      console.log( resp );
      this.element.reset();
      App.setState( 'user-logged' );
      const targetModal = App.getModal( 'register' );
      targetModal.close(); 
    });
    

  }
}
