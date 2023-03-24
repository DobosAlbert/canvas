import { observer } from 'mobx-react-lite';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import { SFTStaked } from '../../utils/types/SftsStaked';
import { Card } from 'react-bootstrap';
import { sftStore, Category } from '../../pages/MyCastle/store/SftStore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, sftsRewards } from '../../config';
import { Loading } from 'components/Loading';
import { EccuLogo } from 'assets/img';

export const DisplaySft = observer(
  ({ sft, category }: { sft: NftType | SFTStaked; category?: Category }) => {
    const { sftSelected, amount } = sftStore;
    const [loading, setLoading] = useState<boolean>(false);
    const [sftDetails, setSftDetails] = useState<NftType>();

    const fetchSftDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(API_URL + '/nfts/' + sft.identifier);
        setSftDetails(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    useEffect(() => {
      if (sft.url) return;
      fetchSftDetails();

      return () => {
        setSftDetails(undefined);
      };
    }, []);

    if (loading) return <Loading />;

    return (
      <Card
        className={`${
          sftSelected?.identifier === sft.identifier
            ? sftStore.category === category
              ? 'sft-selected'
              : undefined
            : undefined
        }`}
      >
        <div className='image-container'>
          <Card.Img
            src={sft.url ? sft.url : sftDetails?.url}
            style={{ borderRadius: '10px 10px 0 0' }}
            onClick={() => sftStore.setSft(sft, category)}
          />
          <div className='image-badge-left'>
            <h5 className='pt-1 mr-1'>{sft.nonce ? sftsRewards.find((sft_nonce) => sft_nonce.nonce === Number(sft.nonce))?.reward : 0}</h5>
            <EccuLogo width={"25px"} height={'25px'} />
          </div>
          <h5 className='image-badge-right'>/daily</h5>
        </div>
        <Card.Header className='d-flex justify-content-between'>
          <span>{sft.name ? sft.name : sftDetails?.name}</span>
          <span>x{sft.balance}</span>
        </Card.Header>
        {sftSelected?.identifier === sft.identifier &&
          sftStore.category === category && (
            <div className='d-flex justify-content-between'>
              <button
                className='btn custom-btn border-fit-1'
                onClick={() => sftStore.decrease()}
              >
                -
              </button>
              <h4>{amount}</h4>
              <button
                className='btn custom-btn border-fit-2'
                onClick={() => sftStore.increase()}
              >
                +
              </button>
            </div>
          )}
      </Card>
    );
  }
);
