/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    this.element = element;
    this.lastOptions = null;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeAccount = this.element.querySelector('.remove-account');   
    if (removeAccount) {
      removeAccount.addEventListener("click", (e) => {
        e.preventDefault();
        this.removeAccount();
       }); 
    }  

     this.element.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target;
        const parent = target.closest('.transaction__remove');
        if (!parent) {
          return;
        }
        const id = parent.getAttribute("data-id");
        this.removeTransaction( id );
       });    
         
  
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) {
      return;
    }
    const id = this.lastOptions.account_id;
    if (confirm("Вы действительно хотите удалить счёт?")) {
      const xhr = Account.remove(id, this.lastOptions, ( err, resp ) => {
        console.log( resp );
        this.clear();
        App.update();
      });
      } else {
        return;
      }
      
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
      const xhr = Transaction.remove(id, '', ( err, resp ) => {
        console.log( resp );
        App.update();
      });
      } else {
        return;
      }
      

  }


  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (!options) {
      return;
    }
    this.lastOptions = options;
    const id = options.account_id;
    const xhr = Account.get(id, options, ( err, resp ) => {
      console.log( resp );
      this.renderTitle(resp.data.name);
    });
    
    const xhr1 = Transaction.list(options, ( err, resp ) => {
      console.log( resp );
      this.renderTransactions(resp.data); 
    });        
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions( [] );
    this.renderTitle( 'Название счёта' );
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    const title = this.element.querySelector('.content-title');   
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    const dt = new Date(date).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    return `${dt}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    const id = item.id;
    const type = item.type.toLowerCase();
    const name = item.name;
    const dt = this.formatDate(item.created_at);
    const sum = item.sum;
    const itemHtml = `
    <div class="transaction transaction_${type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${name}</h4>
          <!-- дата -->
          <div class="transaction__date">${dt}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
      ${sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>
    `;    
    return itemHtml;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const content = this.element.querySelector('.content');
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
    for (let i = 0; i < data.length; i++) {
      const itemHtml = this.getTransactionHTML( data[i] );
      content.insertAdjacentHTML("beforeend",itemHtml);      
    }  
  }
}
