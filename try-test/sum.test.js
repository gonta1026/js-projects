const sum = require('./');

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
})

it('notで「~でない」の判定ができます。', () => {
  expect(sum(1, 2)).not.toBe(34);
})

it('notで「~でない」の判定ができます。', () => {
  expect(sum(1, 2)).not.toBe(34);
})


const myMethod = (cnt, callback) => {
  let total
  while (cnt) {
    total = callback(cnt)
    cnt--
  }
  return total
}


it('mock', () => {
  // arrange
  const mockCallback = jest.fn(x => x * 2)

  // act
  myMethod(3, mockCallback)

  // assert
  // モックメソッドが3回呼ばれたこと
  expect(mockCallback.mock.calls.length).toBe(3)

  // モックメソッドが受け取った引数
  expect(mockCallback.mock.calls[0][0]).toBe(3)  // 1回目 第1引数
  expect(mockCallback.mock.calls[1][0]).toBe(2)  // 2回目 第1引数
  expect(mockCallback.mock.calls[2][0]).toBe(1)  // 3回目 第1引数

  // モックメソッドの戻り値
  expect(mockCallback.mock.results[0].value).toBe(6)  // 1回目
  expect(mockCallback.mock.results[1].value).toBe(4)  // 2回目
  expect(mockCallback.mock.results[2].value).toBe(2)  // 3回目
})
