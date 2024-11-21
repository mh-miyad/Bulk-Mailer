import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export const Title3Cards = () => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Title 3 Cards</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans antialiased">
          <Container className="mx-auto my-[40px] rounded border border-solid border-gray-200 bg-white p-8">
            <Section>
              <Row>
                <Text className="m-0 text-xl font-semibold text-gray-900">
                  Unleash Creativity
                </Text>
                <Text className="mt-2 text-[16px] text-gray-500">
                  Unleash your inner designer with our customizable furniture
                  options, allowing you to create a space that reflects your
                  unique vision
                </Text>
              </Row>
              <Row className="mt-4">
                <Column align="center" colSpan={1} className="w-[33%] pr-1">
                  <Img
                    src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-full rounded-lg object-cover"
                    height="180"
                  />
                  <Text className="m-0 mt-6 text-xl font-semibold text-gray-900">
                    Sleek study
                  </Text>
                  <Text className="m-0 mt-4 text-[16px] text-gray-500">
                    Minimalist design with ample workspace
                  </Text>
                  <Text className="m-0 mt-2 text-[16px] font-semibold text-gray-900">
                    $999.99
                  </Text>
                  <Button
                    className="mt-4 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white"
                    href="#"
                  >
                    Buy
                  </Button>
                </Column>
                <Column align="center" colSpan={1} className="w-[33%] px-1">
                  <Img
                    src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=2789&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-full rounded-lg object-cover"
                    height="180"
                  />
                  <Text className="m-0 mt-6 text-xl font-semibold text-gray-900">
                    Sleek study
                  </Text>
                  <Text className="m-0 mt-4 text-[16px] text-gray-500">
                    Minimalist design with ample workspace
                  </Text>
                  <Text className="m-0 mt-2 text-[16px] font-semibold text-gray-900">
                    $999.99
                  </Text>
                  <Button
                    className="mt-4 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white"
                    href="#"
                  >
                    Buy
                  </Button>
                </Column>
                <Column align="center" colSpan={1} className="w-[33%] pl-1">
                  <Img
                    src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-full rounded-lg object-cover"
                    height="180"
                  />
                  <Text className="m-0 mt-6 text-xl font-semibold text-gray-900">
                    Sleek study
                  </Text>
                  <Text className="m-0 mt-4 text-[16px] text-gray-500">
                    Minimalist design with ample workspace
                  </Text>
                  <Text className="m-0 mt-2 text-[16px] font-semibold text-gray-900">
                    $999.99
                  </Text>
                  <Button
                    className="mt-4 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white"
                    href="#"
                  >
                    Buy
                  </Button>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Title3Cards;
