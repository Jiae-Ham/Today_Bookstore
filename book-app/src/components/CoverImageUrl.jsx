import { useState } from 'react';

const OPENAI_IMAGE_API_URL = 'https://api.openai.com/v1/images/generations';

function CoverImageUrl({ book, setBooks }) {
    const [userApiKey, setUserApiKey] = useState('');
    const [selectedQuality, setSelectedQuality] = useState('low');
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 확인, 만약 작동 중이면 버튼 여러번 못누르게 

    const handleGenerateCover = async () => {
        if (!userApiKey) {
            alert("Api Key가 없어요!");
            return;
        }

        setIsLoading(true);

        try {
            const prompt = `책의 표지를 그릴 것이다. "${book.title}"라는 제목을 그림에 반드시 작성해라. 또한, 책의 내용: "${book.content}" 을(를) 읽고, 해당 책의 내용과 어울리는 표지를 그려라`;
            
            // 디버깅용 콘솔 1
            console.log(`이미지 생성 시작, 입력한 프롬프트: ${prompt}`);

            // OpenAI 이미지 생성 요청하기
            const res = await fetch(OPENAI_IMAGE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userApiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-image-2',
                    prompt,
                    n: 1,
                    size: '1024x1536',
                    quality: selectedQuality,
                    output_format: 'png',
                    response_format: 'b64_json'
                }),
            });

            if (!res.ok) throw new Error('OpenAI 요청 실패!');

            // OpenAI 응답 파싱, b64 json 추출
            const data = await res.json();
            const b64Json = data.data?.[0]?.b64_json;

            // b64 json -> Data URL
            const imageSrc = `data:image/png;base64,${b64Json}`;
            
            // 디버깅용 콘솔 2
            console.log(`Data URL: ${imageSrc}`);

            // json-server 에 coverImageUrl 만 PATCH 하기
            const patchRes = await fetch(`http://localhost:3000/books/${book.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    coverImageUrl: imageSrc, // 소문자 c로 수정
                }),
            });

            if (!patchRes.ok) throw new Error('json-server 도서 정보 업데이트 실패');

            setBooks((prevBooks) =>
             prevBooks.map((b) =>
                b.id === book.id ? { ...b, coverImageUrl: imageSrc } : b
             )
            );

        } catch(error){
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <>
      <input
        type="password"
        placeholder="OpenAI API Key 입력"
        value={userApiKey}
        onChange={(e) => setUserApiKey(e.target.value)}
      />
      <select 
        value={selectedQuality} 
        onChange={(e) => setSelectedQuality(e.target.value)}
      >
        <option value="auto">화질 선택: Auto</option>
        <option value="low">화질 선택: Low</option>
        <option value="medium">화질 선택: Medium</option>
        <option value="high">화질 선택: High</option>
      </select>
      <button onClick={handleGenerateCover} disabled={isLoading}> // 작동중이면 버튼 여러번 못누르게
        {isLoading ? '이미지 생성 중...' : 'AI 표지 생성'}
      </button>
    </>
    );
}

export default CoverImageUrl;