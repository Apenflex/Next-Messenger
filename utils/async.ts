export const delay = (time: number) =>
    new Promise((res) => {
        setTimeout(() => res(1), time)
    })
