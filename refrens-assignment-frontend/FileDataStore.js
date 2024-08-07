import create from 'zustand';

const useStore = create((set) => ({
    fileData: null,
    fileDataSet: (data) => set({ fileData: data })
}));

export { useStore };
