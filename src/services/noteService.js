import axiosService from './axiosService'
class NoteService{
    getAddNote(addNoteDetails){
        return axiosService.post('notes/addNotes',addNoteDetails)
    }
    fetchNotesList(){
        return axiosService.get('notes/getNotesList')
    }
    DeletedNoteMoveToTrash(trashData){
        return axiosService.post('notes/trashNotes',trashData)
    }
    fetchTrashNotesList(){
        return axiosService.get('notes/getTrashNotesList')
    }
    updateNotes(updateData) {
        return axiosService.post('notes/updateNotes',updateData)
    }
    deletePermanent(noteId){
        return axiosService.post('notes/deleteForeverNotes',noteId)
    }
    archiveNotes(archiveData){
        return axiosService.post('notes/archiveNotes',archiveData)
    }
    fetchArchiveNotes(){
        return axiosService.get('notes/getArchiveNotesList')
    }
    unarchiveNotes(noteData){
        return axiosService.post('notes/archiveNotes',noteData)
    }
    changeCardColor(colorData){
        return axiosService.post('notes/changesColorNotes',colorData)
    }
}
export default new NoteService