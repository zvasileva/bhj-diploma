/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const accCreate = this.element.querySelector('.create-account'); 


     this.element.addEventListener("click", (e) => {
      e.preventDefault();

      let target = e.target;

      this.onSelectAccount( target ) ;  
      
      const addAcc = target.closest('.create-account');

      if (addAcc) {
        const targetModal = App.getModal( 'createAccount' );
        targetModal.open();     
      }   
        
      
    });     
   
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const userCurrent = JSON.parse(localStorage.getItem('user'));
    if (userCurrent) {
      const xhr = Account.list(userCurrent, ( err, resp ) => {
        console.log( resp.data );
        this.clear();
        for (let item of resp.data) {
          this.renderItem( item );

        }
      });      
    }

  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = Array.from(this.element.querySelectorAll('.account'));
    for (let i = 0; i < accounts.length; i++) {
      accounts[i].remove();
    }  
  
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {

      const parent = element.closest('.account');
      const accounts = element.closest('.accounts-panel');

      if (!parent) {
          return;
      }

      let activeAcc = accounts.querySelector('.active');  

      //if (activeAcc === parent) {
      //  return;
      //}

      if (activeAcc){
        activeAcc.classList.remove('active');    
      }

      activeAcc = parent;
      activeAcc.classList.add('active');  

      const accId = parent.getAttribute("data-id");

      //App.clear();  
      App.showPage( 'transactions', { account_id: accId });
          
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    const id = item.id;
    const name = item.name;
    const sum = item.sum;
    const itemHtml = `
    <li class="account" data-id="${id}">
      <a href="#">
        <span>${name}</span> /
        <span>${sum} ₽</span>
      </a>
    </li>
    `;
    return itemHtml;
  
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    const itemHtml = this.getAccountHTML(item);
    this.element.innerHTML += itemHtml;
  }
}

