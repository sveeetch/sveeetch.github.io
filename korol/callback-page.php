<div class="container-fluid py-5 text-white" id="callback">
      <div class="container">
        <h3 class="h2 mb-4 font-weight-bold text-center">Заказать обратный звонок</h3>
        <form action="php/application.php" method="POST" name="application">
          <div class="form-row">
            <div class="col-md-6">
              <label>Как к вам обращаться</label>
              <input type="name" name="name" maxlength="20" minlength="2"  required class="form-control" placeholder="Введите ваше имя">
            </div>
            <div class="col-md-6 mt-3 mt-md-0">
              <label>Ваш телефон</label>
              <input name="tel" type="tel" maxlength="20" minlength="6" required class="form-control" placeholder="Введите ваш телефон">
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-default-outline mt-3">Отправить</button>
          </div>
        </form>
      </div>
    </div>