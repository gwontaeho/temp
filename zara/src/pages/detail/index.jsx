import { useCallback, useEffect, useRef, useState } from "react";

import {
  Container,
  Main,
  Image,
  Slider,
  Progress,
  Thumbnails,
  Side,
  SideMin,
  Secondary,
} from "./styles";
import Footer from "../../components/footer";
import Info from "./info";

import { product } from "../../data";

const Detail = () => {
  const sliderRef = useRef();
  const progressRef = useRef();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    sliderRef.current.style.transform = `translateY(calc(-100% / ${product.colors[selectedColor].images.length} * ${progress}))`;
    progressRef.current.style.height = `calc(100% / ${
      product.colors[selectedColor].images.length
    } * ${progress + 1})`;
  }, [progress]);

  const onWheel = useCallback(
    (e) => {
      if (e.deltaY > 0) {
        if (progress === product.colors[selectedColor].images.length - 1)
          return;
        setProgress(progress + 1);
      } else {
        if (progress === 0) return;
        setProgress(progress - 1);
      }
    },
    [selectedColor, progress]
  );

  const onScroll = useCallback((e) => {
    e.currentTarget.scroll(0, 0);
  }, []);

  const onClick = useCallback((i) => {
    setProgress(i);
  }, []);

  const onClickColor = useCallback((color) => {
    setSelectedColor(color);
    setProgress(0);
    setSelectedSize(null);
    setOpen(true);
  }, []);

  const onClickSize = useCallback(
    (size) => {
      setSelectedSize(size);
      setOpen(!open);
    },
    [open]
  );

  return (
    <Container>
      <Main>
        <Info />
        <Image>
          <Slider onWheel={onWheel} onScroll={onScroll}>
            <div ref={sliderRef}>
              {product.colors[selectedColor].images.map((image, i) => {
                return <img key={i} src={image} alt="product" />;
              })}
            </div>
          </Slider>
          <Progress>
            <div className="bar" />
            <div className="progress" ref={progressRef} />
          </Progress>
          <Thumbnails className="thumbnails">
            <ul>
              {product.colors[selectedColor].images.map((image, i) => {
                return (
                  <li key={i}>
                    <img src={image} alt="product" onClick={() => onClick(i)} />
                  </li>
                );
              })}
            </ul>
          </Thumbnails>
        </Image>
        <Side>
          <div className="name">{product.name}</div>
          <div>{product.text}</div>
          <div>{product.price}</div>
          <div>색상 {product.colors[selectedColor].color} | 3046/032</div>
          <div className="colors">
            {product.colors.map((color) => {
              return (
                <div
                  key={color.id}
                  className="color"
                  style={{
                    border: selectedColor === color.id ? "1px solid black" : "",
                  }}
                  onClick={() => onClickColor(color.id)}
                >
                  <div style={{ backgroundColor: color.code }} />
                </div>
              );
            })}
          </div>
          <div className="sizes">
            {product.sizes.map((size) => {
              return (
                <div
                  className="size"
                  key={size.id}
                  style={{
                    fontWeight: selectedSize === size.id ? "bold" : "",
                    display:
                      !open && selectedSize !== size.id ? "none" : "block",
                  }}
                  onClick={() => onClickSize(size.id)}
                >
                  {size.size}
                </div>
              );
            })}
          </div>
          <div className="size-guide">
            <div>
              <div>사이즈 찾기</div>
              <div className="mark">?</div>
            </div>
            <div>사이즈 가이드</div>
          </div>
          <div className="cart">장바구니</div>
          <div className="actions">
            <div>오프라인 매장에 재고 상태 보기</div>
            <div>배송, 교환 및 반품</div>
            <div>공유하기</div>
          </div>
        </Side>
        <SideMin>
          <div className="info">
            <div>
              <div className="name">{product.name}</div>
              <div>{product.price}</div>
            </div>
            <div className="colors">
              {product.colors.map((color) => {
                return (
                  <div
                    key={color.id}
                    className="color"
                    style={{
                      border:
                        selectedColor === color.id ? "1px solid black" : "",
                    }}
                    onClick={() => onClickColor(color.id)}
                  >
                    <div style={{ backgroundColor: color.code }} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="cart">장바구니</div>
        </SideMin>
      </Main>
      {!!product.looks.length && (
        <Secondary>
          <div className="title">룩 완성하기</div>
          <div className="products">
            {product.looks.map((look) => {
              return (
                <div key={look.id} className="product">
                  <img src={look.image} alt={look.name} />
                  <div>
                    {look.new && "NEW"}
                    {look.new && !!look.color && " / "}
                    {!!look.color && `+${look.color} 컬러`}
                  </div>
                  <div>{look.name}</div>
                  <div>{look.price}</div>
                  <div className="cart">장바구니</div>
                </div>
              );
            })}
          </div>
        </Secondary>
      )}
      {!!product.suggestions.length && (
        <Secondary>
          <div className="title">추천 제품</div>
          <div className="products">
            {product.suggestions.map((suggestion) => {
              return (
                <div key={suggestion.id} className="product">
                  <img src={suggestion.image} alt={suggestion.name} />
                  <div>
                    {suggestion.new && "NEW"}
                    {suggestion.new && !!suggestion.color && " / "}
                    {!!suggestion.color && `+${suggestion.color} 컬러`}
                  </div>
                  <div>{suggestion.name}</div>
                  <div>{suggestion.price}</div>
                  <div className="cart">장바구니</div>
                </div>
              );
            })}
          </div>
        </Secondary>
      )}
      <Footer />
    </Container>
  );
};

export default Detail;
