const initialState = [{noteitems: [],}]

export default function notes(state=initialState, action) {
    //собрать все массивы с ключами noteitems и объединить в один массив
    let noteList = state.map(a => a.noteitems).reduce((a, b) => [...a, ...b], []).slice();

    switch (action.type) {

        case 'FETCH_NOTES':
            //удаление дубликатов
            noteList = noteList.filter((noteList, index, self) => self.findIndex(t => t.created_at === noteList.created_at && t.id === noteList.id) === index)
            
            return [                    

                    {...state[state.length-1],
                    noteitems: noteList},
                    ...action.notes


                ];
        case 'SEARCH_NOTES':
            //удаление дубликатов
            // noteList = noteList.filter((noteList, index, self) => self.findIndex(t => t.created_at === noteList.created_at && t.id === noteList.id) === index)
            noteList = action.notes
            // console.log(action.notes);          
            return [                    

                    {...state,
                    ...action.notes},
                ];

        case 'ORDER_NOTES':
            //удаление дубликатов
            // noteList = noteList.filter((noteList, index, self) => self.findIndex(t => t.created_at === noteList.created_at && t.id === noteList.id) === index)
            noteList = action.notes
            // console.log(action.notes);          
            return [                    

                    {...state,
                    ...action.notes},
                ];


        case 'ADD_NOTE':
            // Добавляем заметку
            noteList.unshift(action.note);
            // Удаляем нижнюю
            // if (noteList.length > 0) {
            //     noteList.pop();
            // }

            return [
                        //берем последний стейт и добавляем к нему общий массив
                        {...state[state.length-1],
                            noteitems: noteList},

                    ];

        case 'UPDATE_NOTE':

            //Поиск в общем массиве элемента по id и index (2мерный массив)
            let selectById = state[action.index].noteitems[action.id].id
            let indexEdit = noteList.findIndex(p => p.id === selectById) 

            let noteToUpdate = noteList[indexEdit]
            noteToUpdate.text = action.note.text;
            noteToUpdate.phone = action.note.phone;
            noteToUpdate.status = action.note.status;
            noteToUpdate.is_corporate = action.note.is_corporate;
            noteToUpdate.is_payed = action.note.is_payed;
            noteToUpdate.email = action.note.email;
            noteToUpdate.linkedin_profile = action.note.linkedin_profile;
            noteToUpdate.website = action.note.website;
            noteList.splice(indexEdit, 1, noteToUpdate);
            return [
                    {...state[state.length-1],
                        noteitems: noteList},
                    ];

        case 'DELETE_NOTE':
            //Поиск в общем массиве элемента по id и index (2мерный массив)
            let deleteById = state[action.id].noteitems[action.index].id
            let indexDel = noteList.findIndex(p => p.id === deleteById)            

            noteList.splice(indexDel, 1);
            return [
                        {...state[state.length-1],
                            noteitems: noteList}
                    ];

        default:
            return state;
    }
}
