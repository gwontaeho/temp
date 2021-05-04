import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  background-color: lightgrey;

  .btns {
    height: 48px;
    width: 100%;
    margin-bottom: 24px;
    display: flex;
    background-color: white;

    a {
      width: 120px;
      height: 100%;
      text-align: center;
      line-height: 48px;
      background-color: lightblue;
      border-radius: 6px;
      color: white;
      margin-right: 24px;
      cursor: pointer;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    width: 100%;

    .section {
      display: flex;
      margin-bottom: 24px;
      border: 1px solid black;

      img {
        width: 360px;
        height: 240px;
        object-fit: cover;
      }

      .title {
        display: flex;
        align-items: center;
        width: 240px;
        height: 72px;
      }

      input {
        width: 240px;
        height: 36px;
      }

      .details {
        display: flex;
        flex-direction: column;
        flex: 1;

        .add {
          display: flex;
          align-items: center;
          width: 120px;
          height: 72px;
        }

        .detailContainer {
          display: flex;
          flex-direction: column;
          width: 100%;

          .detail {
            display: flex;
            width: 100%;
            flex-direction: column;
            margin-bottom: 24px;

            .header {
              height: 72px;
              display: flex;
              align-items: center;

              .removeButton {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 36px;
                width: 48px;
                background-color: white;
              }
            }

            textarea {
              height: 240px;
              resize: none;
            }
          }
        }
      }
    }
  }

  }
`;
