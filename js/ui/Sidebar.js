/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const button = document.querySelector('.sidebar-toggle');    
    const body = document.querySelector('.sidebar-mini'); 

    function openSidebar () {
      const activeSidebar = document.querySelector( '.sidebar-open');
      if (activeSidebar) {
        activeSidebar.classList.remove('sidebar-open');
        activeSidebar.classList.add('sidebar-collapse');
        return;
      }  
      body.classList.add('sidebar-open');
      //body.classList.add('sidebar-collapse');
    }

    button.addEventListener('click', e => {
      e.preventDefault();
      openSidebar();       
    } );   
  

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const reg = document.querySelector('.menu-item_register');      
     reg.addEventListener("click", (e) => {
      e.preventDefault();
      const targetModal = App.getModal( 'register' );
      targetModal.open(); 
     }); 
     
     const login = document.querySelector('.menu-item_login');      
     login.addEventListener("click", (e) => {
      e.preventDefault();
      const targetModal = App.getModal( 'login' );
      targetModal.open(); 
     });     
     
     const logout = document.querySelector('.menu-item_logout');      
     logout.addEventListener("click", (e) => {
      e.preventDefault();
      const userCurrent = JSON.parse(localStorage.getItem('user'));
      const xhr = User.logout(userCurrent, ( err, resp ) => {
        console.log( resp );
        User.unsetCurrent();
        App.setState( 'init' );
      });
     });         
       
  }

}

