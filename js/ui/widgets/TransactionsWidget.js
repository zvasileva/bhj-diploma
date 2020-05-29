/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const income = this.element.querySelector('.create-income-button');      
    income.addEventListener("click", (e) => {
      e.preventDefault();
      const targetModal = App.getModal( 'newIncome' );
      targetModal.open(); 
     }); 
     
     const expense = this.element.querySelector('.create-expense-button');      
     expense.addEventListener("click", (e) => {
      e.preventDefault();
      const targetModal = App.getModal( 'newExpense' );
      targetModal.open(); 
     });  
  }
}
