import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../../components/footer";
import { products } from "../../data";
import {
  Container,
  Products,
  Space,
  Content,
  Text,
  One,
  Two,
  Four,
} from "./styles";

const Category = () => {
  const navigate = useNavigate();

  const onClickNavigateDetail = useCallback(() => {
    navigate("/detail");
  }, []);

  const Product = useCallback(
    ({ product }) => (
      <Content>
        <img
          onClick={onClickNavigateDetail}
          src={product.image}
          alt={product.id}
        />
        <div>
          {product.new && "NEW"}
          {product.new && !!product.color && " / "}
          {!!product.color && `+${product.color} 컬러`}
        </div>
        <Link to="/detail" className="name">
          {product.name}
        </Link>
        <div>{product.price}</div>
      </Content>
    ),
    []
  );

  return (
    <Container>
      <Products>
        <Space />
        <One>
          <Product product={products[0]} />
        </One>
        <Space />
        <Text>
          <div className="title">데일리 룩을 완성할 여성 아우터</div>
          <div>
            실용적이고 스타일리시한 트렌치 코트부터 다가오는 계절을 위한 파카,
            스마트한 블레이저, 시크한 기모노 아우터까지, ZARA의 온라인
            컬렉션에서 이번 시즌 필요한 모든 아우터 스타일을 만나보세요. 모든
            순간을 함께 할 아이템을 찾고 스타일리시한 레이어로 마무리해보세요.
            시간이 지나도 변함없는 좋은 품질의 클래식한 아이템을 쇼핑해보세요.
          </div>
        </Text>
        <Space />
        <Two>
          <Product product={products[1]} />
          <Product product={products[2]} />
        </Two>
        <Space />
        <One>
          <Product product={products[3]} />
        </One>
        <Space />
        <Two>
          <Product product={products[4]} />
          <Product product={products[5]} />
        </Two>
        <Space />
        <One>
          <Product product={products[6]} />
        </One>
        <Space />
        <Four>
          <Product product={products[7]} />
          <Product product={products[8]} />
          <Product product={products[9]} />
          <Product product={products[10]} />
        </Four>
        <Space />
        <One>
          <Product product={products[11]} />
        </One>
      </Products>
      <Footer />
    </Container>
  );
};

export default Category;
