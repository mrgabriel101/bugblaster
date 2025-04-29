import React, { useState, useEffect } from 'react';

const TicketForm = ({ dispatch, editingTicket }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('1');

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority.toString());
    } else {
      clearForm();
    }
  }, [editingTicket]);

  const handleCancel = () => {
    clearForm();
    dispatch({ type: 'CLEAR_EDITING_TICKET' });
  };

  const priorityLabels = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPriority('1');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      id: editingTicket ? editingTicket.id : new Date().toISOString(),
      title,
      description,
      priority,
    };

    dispatch({
      type: editingTicket ? 'UPDATE_TICKET' : 'ADD_TICKET',
      payload: ticketData,
    });

    console.log('Ticket Data:', ticketData);

    clearForm();
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          className="form-input"
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          className="form-input"
          id="description"
          name="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <fieldset className="priority-fieldset">
        <legend>Priority</legend>
        {Object.entries(priorityLabels).map(([value, label]) => (
          <label className="priority-label" key={value}>
            <input
              className="priority-input"
              type="radio"
              name="priority"
              value={value}
              checked={priority === value}
              onChange={(e) => setPriority(e.target.value)}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="button">
        Submit
      </button>
      {editingTicket && (
        <button type="button" className="button" onClick={handleCancel}>
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default TicketForm;
