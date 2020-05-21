/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const listInc = document.getElementById('income-accounts-list');
    const listExp = document.getElementById('expense-accounts-list');

    //const form = this.element.getAttribute("id");
    const userCurrent = JSON.parse(localStorage.getItem('user'));
    if (userCurrent) {
      const xhr = Account.list(userCurrent, ( err, resp ) => {
        console.log( resp.data );
        while (listInc.firstChild) {
          listInc.removeChild(listInc.firstChild);
        }
        while (listExp.firstChild) {
          listExp.removeChild(listExp.firstChild);
        }          
        for (let item of resp.data) {
          const id = item.id;
          const name = item.name;    
          listInc.insertAdjacentHTML("beforeend",
          `<option value="${id}">${name}</option>`);
          listExp.insertAdjacentHTML("beforeend",
          `<option value="${id}">${name}</option>`);          
        }
      });      
    }    

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    const xhr = Transaction.create(options.data, ( err, resp ) => {
      console.log( resp );
      this.element.reset();
      App.update();
      const targetModalInc = App.getModal( 'newIncome' );
      targetModalInc.close(); 
      const targetModalExp = App.getModal( 'newExpense' );
      targetModalExp.close();       
    });
  }
}
