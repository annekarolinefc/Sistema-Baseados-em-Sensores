class Estacao {
    #id;
    constructor(id_estacao, nome_estacao) {
        this._id_estacao = id_estacao;
        this._nome_estacao = nome_estacao;
        this._cod_regiao = cod_regiao;
        this._uf = uf;
        this._codigo_wmo = codigo_wmo;
        this._latitude = latitude;
        this._longitude = longitude;
        this._altitude = altitude;
        this._data_fundacao = data_fundacao;
    }
    get ID() { return this.id_estacao; }
}