// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class BountyCreated extends ethereum.Event {
  get params(): BountyCreated__Params {
    return new BountyCreated__Params(this);
  }
}

export class BountyCreated__Params {
  _event: BountyCreated;

  constructor(event: BountyCreated) {
    this._event = event;
  }

  get _bountyId(): string {
    return this._event.parameters[0].value.toString();
  }

  get _rewards(): Array<BigInt> {
    return this._event.parameters[1].value.toBigIntArray();
  }
}

export class Claim extends ethereum.Event {
  get params(): Claim__Params {
    return new Claim__Params(this);
  }
}

export class Claim__Params {
  _event: Claim;

  constructor(event: Claim) {
    this._event = event;
  }

  get _receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _bountyId(): string {
    return this._event.parameters[1].value.toString();
  }

  get _bountyIndex(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _contractIndex(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _isAdmin(): boolean {
    return this._event.parameters[4].value.toBoolean();
  }
}

export class ERC20PaymentReleased extends ethereum.Event {
  get params(): ERC20PaymentReleased__Params {
    return new ERC20PaymentReleased__Params(this);
  }
}

export class ERC20PaymentReleased__Params {
  _event: ERC20PaymentReleased;

  constructor(event: ERC20PaymentReleased) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class WinnersDeclared extends ethereum.Event {
  get params(): WinnersDeclared__Params {
    return new WinnersDeclared__Params(this);
  }
}

export class WinnersDeclared__Params {
  _event: WinnersDeclared;

  constructor(event: WinnersDeclared) {
    this._event = event;
  }

  get _bountyId(): string {
    return this._event.parameters[0].value.toString();
  }
}

export class BountyMaker__bountysResult {
  value0: string;
  value1: BigInt;
  value2: boolean;
  value3: BigInt;

  constructor(value0: string, value1: BigInt, value2: boolean, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromBoolean(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }
}

export class BountyMaker extends ethereum.SmartContract {
  static bind(address: Address): BountyMaker {
    return new BountyMaker("BountyMaker", address);
  }

  adminClaimToken(_bountyId: string, to: Address): BigInt {
    let result = super.call(
      "adminClaimToken",
      "adminClaimToken(string,address):(uint256)",
      [ethereum.Value.fromString(_bountyId), ethereum.Value.fromAddress(to)]
    );

    return result[0].toBigInt();
  }

  try_adminClaimToken(
    _bountyId: string,
    to: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "adminClaimToken",
      "adminClaimToken(string,address):(uint256)",
      [ethereum.Value.fromString(_bountyId), ethereum.Value.fromAddress(to)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  bountys(param0: string): BountyMaker__bountysResult {
    let result = super.call(
      "bountys",
      "bountys(string):(string,uint128,bool,uint256)",
      [ethereum.Value.fromString(param0)]
    );

    return new BountyMaker__bountysResult(
      result[0].toString(),
      result[1].toBigInt(),
      result[2].toBoolean(),
      result[3].toBigInt()
    );
  }

  try_bountys(param0: string): ethereum.CallResult<BountyMaker__bountysResult> {
    let result = super.tryCall(
      "bountys",
      "bountys(string):(string,uint128,bool,uint256)",
      [ethereum.Value.fromString(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new BountyMaker__bountysResult(
        value[0].toString(),
        value[1].toBigInt(),
        value[2].toBoolean(),
        value[3].toBigInt()
      )
    );
  }

  claimToken(_bountyId: string): BigInt {
    let result = super.call("claimToken", "claimToken(string):(uint256)", [
      ethereum.Value.fromString(_bountyId)
    ]);

    return result[0].toBigInt();
  }

  try_claimToken(_bountyId: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall("claimToken", "claimToken(string):(uint256)", [
      ethereum.Value.fromString(_bountyId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimed(param0: Address, param1: string): BigInt {
    let result = super.call("claimed", "claimed(address,string):(uint256)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromString(param1)
    ]);

    return result[0].toBigInt();
  }

  try_claimed(param0: Address, param1: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall("claimed", "claimed(address,string):(uint256)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromString(param1)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  open(): boolean {
    let result = super.call("open", "open():(bool)", []);

    return result[0].toBoolean();
  }

  try_open(): ethereum.CallResult<boolean> {
    let result = super.tryCall("open", "open():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  rewards(param0: string, param1: BigInt): BigInt {
    let result = super.call("rewards", "rewards(string,uint256):(uint256)", [
      ethereum.Value.fromString(param0),
      ethereum.Value.fromUnsignedBigInt(param1)
    ]);

    return result[0].toBigInt();
  }

  try_rewards(param0: string, param1: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("rewards", "rewards(string,uint256):(uint256)", [
      ethereum.Value.fromString(param0),
      ethereum.Value.fromUnsignedBigInt(param1)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  token(): Address {
    let result = super.call("token", "token():(address)", []);

    return result[0].toAddress();
  }

  try_token(): ethereum.CallResult<Address> {
    let result = super.tryCall("token", "token():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  winners(param0: Address, param1: string): BigInt {
    let result = super.call("winners", "winners(address,string):(uint128)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromString(param1)
    ]);

    return result[0].toBigInt();
  }

  try_winners(param0: Address, param1: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall("winners", "winners(address,string):(uint128)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromString(param1)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AdminClaimTokenCall extends ethereum.Call {
  get inputs(): AdminClaimTokenCall__Inputs {
    return new AdminClaimTokenCall__Inputs(this);
  }

  get outputs(): AdminClaimTokenCall__Outputs {
    return new AdminClaimTokenCall__Outputs(this);
  }
}

export class AdminClaimTokenCall__Inputs {
  _call: AdminClaimTokenCall;

  constructor(call: AdminClaimTokenCall) {
    this._call = call;
  }

  get _bountyId(): string {
    return this._call.inputValues[0].value.toString();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class AdminClaimTokenCall__Outputs {
  _call: AdminClaimTokenCall;

  constructor(call: AdminClaimTokenCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class ClaimTokenCall extends ethereum.Call {
  get inputs(): ClaimTokenCall__Inputs {
    return new ClaimTokenCall__Inputs(this);
  }

  get outputs(): ClaimTokenCall__Outputs {
    return new ClaimTokenCall__Outputs(this);
  }
}

export class ClaimTokenCall__Inputs {
  _call: ClaimTokenCall;

  constructor(call: ClaimTokenCall) {
    this._call = call;
  }

  get _bountyId(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class ClaimTokenCall__Outputs {
  _call: ClaimTokenCall;

  constructor(call: ClaimTokenCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class CreateBountyCall extends ethereum.Call {
  get inputs(): CreateBountyCall__Inputs {
    return new CreateBountyCall__Inputs(this);
  }

  get outputs(): CreateBountyCall__Outputs {
    return new CreateBountyCall__Outputs(this);
  }
}

export class CreateBountyCall__Inputs {
  _call: CreateBountyCall;

  constructor(call: CreateBountyCall) {
    this._call = call;
  }

  get _bountyId(): string {
    return this._call.inputValues[0].value.toString();
  }

  get uri(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _tokenLimit(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _rewards(): Array<BigInt> {
    return this._call.inputValues[3].value.toBigIntArray();
  }

  get _endTime(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class CreateBountyCall__Outputs {
  _call: CreateBountyCall;

  constructor(call: CreateBountyCall) {
    this._call = call;
  }
}

export class OpenToPublicCall extends ethereum.Call {
  get inputs(): OpenToPublicCall__Inputs {
    return new OpenToPublicCall__Inputs(this);
  }

  get outputs(): OpenToPublicCall__Outputs {
    return new OpenToPublicCall__Outputs(this);
  }
}

export class OpenToPublicCall__Inputs {
  _call: OpenToPublicCall;

  constructor(call: OpenToPublicCall) {
    this._call = call;
  }

  get _isOpen(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class OpenToPublicCall__Outputs {
  _call: OpenToPublicCall;

  constructor(call: OpenToPublicCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetBountyWinnersCall extends ethereum.Call {
  get inputs(): SetBountyWinnersCall__Inputs {
    return new SetBountyWinnersCall__Inputs(this);
  }

  get outputs(): SetBountyWinnersCall__Outputs {
    return new SetBountyWinnersCall__Outputs(this);
  }
}

export class SetBountyWinnersCall__Inputs {
  _call: SetBountyWinnersCall;

  constructor(call: SetBountyWinnersCall) {
    this._call = call;
  }

  get _bountyId(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _winners(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }
}

export class SetBountyWinnersCall__Outputs {
  _call: SetBountyWinnersCall;

  constructor(call: SetBountyWinnersCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateAdminCall extends ethereum.Call {
  get inputs(): UpdateAdminCall__Inputs {
    return new UpdateAdminCall__Inputs(this);
  }

  get outputs(): UpdateAdminCall__Outputs {
    return new UpdateAdminCall__Outputs(this);
  }
}

export class UpdateAdminCall__Inputs {
  _call: UpdateAdminCall;

  constructor(call: UpdateAdminCall) {
    this._call = call;
  }

  get _admin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get isAdmin(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class UpdateAdminCall__Outputs {
  _call: UpdateAdminCall;

  constructor(call: UpdateAdminCall) {
    this._call = call;
  }
}
