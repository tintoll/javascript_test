import React from 'react';
import DelayedToggle from './DelayedToggle';
import { render, fireEvent, wait, waitForElement, waitForDomChange, waitForElementToBeRemoved } from "@testing-library/react";

describe('<DelayedToggle />', () => {

  it('reveals text wheen toggle is ON', async () => {
    const { getByText } = render(<DelayedToggle />);
    const toggleButton = getByText('토글');
    fireEvent.click(toggleButton);
    // 콜백 안의 함수가 에러가 발생시키지 않을때 까지 기다립니다.
    // timeout 기본값은 4500ms 이다. 
    await wait( () => getByText('야호!!'), {timeout : 3000}); 

  });

  it('toggles text ON/OFF', async () => {
    const { getByText } = render(<DelayedToggle />);
    const toggleButton = getByText('토글');
    fireEvent.click(toggleButton);
    // waitForElement 함수는 특정 엘리먼트가, 나타났거나, 바뀌었거나, 사라질때까지 대기를 해줍니다. 
    // 프로미스가 끝날때 우리가 선택한 엘리먼트를 resolve한다.
    const text = await waitForElement(() => getByText('ON'));
    expect(text).toHaveTextContent('ON');
  });


  it('changes something when button is clicked', async () => {
    const { getByText, container } = render(<DelayedToggle />);
    const toggleButton = getByText('토글');
    fireEvent.click(toggleButton);
    // waitForDomChange는 콜백함수가 아니라 검사하고 싶은 엘리먼트를 넣어주면 해당 엘리먼트에서 변화가 발생할 때까지 기다려줍니다.
    const mutations = await waitForDomChange({container});
    // 프로미스가 resolve됐을때 mutationList를 반환하여 DOM이 어떻게 바뀌었는지에 대한 정보를 알수 있다.
    // console.log(mutations);
  });

  it('removes text when toggle is OFF', async () => {
    const { getByText, container } = render(<DelayedToggle />);
    const toggleButton = getByText('토글');
    fireEvent.click(toggleButton);

    await waitForDomChange({container}); //  ON이 됨
    getByText('야호!!');
    fireEvent.click(toggleButton);
    // waitForElementToBeRemove는 특정 엘리먼트가 화면에서 사라질때까지 기다리는 함수입니다.
    await waitForElementToBeRemoved( () => getByText('야호!!'));

  });

});