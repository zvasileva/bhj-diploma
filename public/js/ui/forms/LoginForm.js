/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    const xhr = User.login(options.data, ( err, resp ) => {
      User.setCurrent( resp.user );
      console.log( resp );
      this.element.reset();
      App.setState( 'user-logged' );
      const targetModal = App.getModal( 'login' );
      targetModal.close(); 
    });
  }
}
