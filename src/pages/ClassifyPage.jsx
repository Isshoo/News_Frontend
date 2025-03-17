import React, { Component } from 'react';
import LocaleContext from '../contexts/LocaleContext';
import Pages from '../components/styled/Pages';
import { predict } from '../utils/api/classifier';
import Loading from '../components/Base/LoadingBar';

class ClassifyPage extends Component {
  static contextType = LocaleContext;

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      hybridPredict: '',
      deepseekPredict: '',
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  predictNews = async () => {
    this.setState({ loading: true });
    const response = await predict({ text: this.state.text });
    if (!response.deepseek_prediction) {
      this.predictNews();
    }

    if (response.error) {
      alert(response.error);
      this.setState({ loading: false });
      return;
    }
    this.setState({
      hybridPredict: response.hybrid_prediction,
      deepseekPredict: response.deepseek_prediction,
      loading: false,
    });
  };

  render() {
    const { locale } = this.context;
    const { text, hybridPredict, deepseekPredict, loading } = this.state;

    return (
      <Pages>
        <form id='threadForm' autoComplete='off'>
          <div>
            <label htmlFor='title'>
              {locale === 'EN' ? 'Input News Text' : 'Masukan Teks Berita'}
            </label>
            <input
              type='text'
              id='title'
              name='title'
              required
              placeholder={locale === 'EN' ? 'Text' : 'Teks'}
              aria-describedby='titleValidation'
              value={text}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <button
            className={loading ? 'disabled' : ''}
            type='button'
            id='threadsSubmit'
            onClick={this.predictNews}
          >
            {locale === 'EN' ? 'Classify' : 'Klasifikasi'}
          </button>
        </form>
        <br />
        {loading ? (
          <Loading />
        ) : (
          <div className='result-text'>
            {hybridPredict && <p>Prediksi Hybrid C5.0-KNN : {hybridPredict}</p>}
            {deepseekPredict && <p>Prediksi Deepseek : {deepseekPredict}</p>}
          </div>
        )}
      </Pages>
    );
  }
}

export default ClassifyPage;
