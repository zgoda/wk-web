function EventForm() {
  return (
    <div class="formBody">
      <form>
        <label>
          Nazwa
          <input type="text" />
        </label>
        <label>
          Data
          <input type="date" />
        </label>
        <label>
          Długość trasy
          <input type="number" />
        </label>
        <label>
          Lokalizacja
          <input type="text" />
        </label>
        <fieldset>
          <label>
            <input type="checkbox" />
            Wirtualny
          </label>
        </fieldset>
        <fieldset>
          <label>
            <input type="checkbox" />
            Publiczny
          </label>
        </fieldset>
        <label>
          Opis
          <textarea />
        </label>
        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
}

export { EventForm };
